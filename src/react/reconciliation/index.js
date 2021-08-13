import { createTaskQueue, arrified, createStateNode, getTag } from '../Misc'

const taskQueue = createTaskQueue()

// 要执行的子任务
let subTask = null

// 最外层 Fiber 对象，pendingCommit.effects 存储着所有的 Fiber 对象
let pendingCommit = null

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop()
  // 返回最外层的 Fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

const reconcileChildren = (fiber, children) => {
  // children 可能是数组，也可能是对象
  const arrifiedChildren = arrified(children)

  let index = 0
  const numberOfElements = arrifiedChildren.length
  let element = null
  let newFiber = null
  let prevFiber = null

  while (index < numberOfElements) {
    element = arrifiedChildren[index]
    // 子级 Fiber 对象
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      // stateNode: null,
      parent: fiber
    }

    // 为 Fiber 节点对象添加 DOM 对象或者组件实例对象
    newFiber.stateNode = createStateNode(newFiber)

    if (index === 0) {
      // 为父级 Fiber 对象添加子级 Fiber 对象
      fiber.child = newFiber
    } else {
      // 为 Fiber 对象添加下一个兄弟 Fiber 对象
      prevFiber.sibling = newFiber
    }
  
    prevFiber = newFiber

    index++
  }
}

const executeTask = fiber => {
  // 构建子节点的 Fiber 对象
  if (fiber.tag === 'class_component') {
    // 如果是类组件，调用组件实例对象的 render 方法，获取 render 返回的 Fiber 的子元素
    reconcileChildren(fiber, fiber.stateNode.render())
  } else if (fiber.tag === 'function_component') {
    // 如果是函数组件，调用函数组件本身
    reconcileChildren(fiber, fiber.stateNode(fiber.props))
  } else {
    // 普通元素
    reconcileChildren(fiber, fiber.props.children)
  }
  if (fiber.child) {
    return fiber.child
  }

  let currentExecutelyFiber = fiber
  // 当前节点是否有兄弟 Fiber 对象
  while (currentExecutelyFiber.parent) {
    // 合并 effects 数组的 Fiber 对象
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    )

    // 当前 Fiber 对象是否有兄弟 Fiber 对象
    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling
    }
    // 如果当前 Fiber 对象没有兄弟 Fiber 对象，继续向上查找父亲 Fiber 对象
    currentExecutelyFiber = currentExecutelyFiber.parent
  }

  pendingCommit = currentExecutelyFiber
}

const commitAllWork = fiber => {
  fiber.effects.forEach(item => {
    // 追加节点
    if (item.effectTag === 'placement') {
      let parentFiber = item.parent
      /**
       * 继续判断当前 Fiber 对象对应的节点是否是 类组件
       * 父级组件不能直接追加真实 DOM 节点的
       */
      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent
      }
      if (item.tag === 'host_component') {
        // item.parent.stateNode.appendChild(item.stateNode)
        parentFiber.stateNode.appendChild(item.stateNode)
      }
    }
  })
}

const workLoop = deadline => {
  // 是否有待执行任务
  if (!subTask) {
    // 从任务队列中获取任务
    subTask = getFirstTask()
  }
  // 如果任务存在，并且浏览器有空闲时间，就调用 executeTask 方法执行任务
  while (subTask && deadline.timeRemaining() > 1) {
    // 执行任务，并且 executeTask 任务需要返回新的任务
    subTask = executeTask(subTask)
  }

  // 判断 pendingCommit 对象是否存在
  if (pendingCommit) {
    commitAllWork(pendingCommit)
  }
}

const performTask = deadline => {
  // 循环执行任务
  workLoop(deadline)
  // 判断 subTask 是否还有任务，或者任务队列还有任务未执行，再一次注册在浏览器空闲时间要执行的任务事件
  if (subTask || !taskQueue.isEmpty) {
    requestIdleCallback(performTask)
  }
}

export const render = (element, container) => {
  /**
   * 1. 向任务队列中添加任务
   * 2. 指定在浏览器空闲时间执行任务
   */

  // 任务是通过 VirtualDOM 对象构建 Fiber 对象
  taskQueue.push({
    dom: container,
    props: {
      children: element
    }
  })
  // 指定在浏览器空闲事件去执行任务
  requestIdleCallback(performTask)
}
