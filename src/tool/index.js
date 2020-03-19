/**
 * Relation数据结构
 * sid: number
 * fid: number
 *
 * Node数据结构
 *  parents: Array<Relation>
 *  id: number
 *  children: Array<Relation>
 *
 * 注意：
 * 如果Relation在parents中，fid表示父节点，sid表示当前节点
 * 如果Relation在children中，fid表示当前节点，sid表示子节点
 */

/**
 * 对数据进行分组
 * 1. 暴力实现方式
 * 1.1 先对数据进行分组
 * 1.2 再对分组后的数据去重，留最远距离的节点
 * 2. 另外一种思路： 给每一个node节点进行打标floor，floor表示该节点所在的分组，这样可以直接确定节点所在的层数；
 * @param sourceData
 * @returns {*}
 */
import { TYPES } from "./constants";

export function groupData(sourceData) {
  // 将接口返回的数据转换成我需要的数据
  sourceData = transformData(sourceData);
  let result;

  function loop(data, childrenIds, res) {
    //  1. 根据childrenIds找到所有的children
    const children = data.filter(i => childrenIds.includes(i.id));
    res.push(children);
    // 2. 找到所有children下的children的id集合
    const nextChildrenIds = children.reduce((acc, cur) => {
      return acc.concat(
        cur.children.reduce((a, c) => {
          return a.concat(c.sid);
        }, [])
      );
    }, []);
    // 3. 对id进行去重
    const filterChildrenIds = [...new Set(nextChildrenIds)];
    // 4. 递归处理
    if (filterChildrenIds.length) {
      loop(data, filterChildrenIds, res);
    }
    return res;
  }
  // 1. 找到所有的根节点
  const rootNode = getRootNode(sourceData);
  // 2. 计算所有根节点的子节点id
  const rootChildren = rootNode.reduce((acc, cur) => {
    return acc.concat(
      cur.children.reduce((a, c) => {
        return a.concat(c.sid);
      }, [])
    );
  }, []);
  // 3. 递归调用分组
  result = loop(sourceData, [...new Set(rootChildren)], [rootNode]);
  // 4. 去除重复节点，保留最远节点
  result = filterMiddleNode(result);
  const maxWidth = result.length;
  const maxHeight = Math.max(
    ...result.reduce((acc, cur) => acc.concat(cur.length), [])
  );
  return {
    data: result,
    maxWidth,
    maxHeight
  };
}

/**
 * 获取根节点
 * @param sourceData
 * @returns {Node}
 */
function getRootNode(sourceData) {
  return sourceData.filter(
    i => i.parents.length === 0 && i.serviceType === TYPES.active
  );
}

function filterMiddleNode(nodes) {
  const res = [];
  const ids = [];
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];
    res.push(
      node.filter(item => {
        if (!ids.includes(item.id)) {
          ids.push(item.id);
          return true;
        }
        return false;
      })
    );
  }
  return res.reverse();
}

function transformData(data) {
  return data.map(item => {
    const { parents, children, current } = item;
    return {
      parents,
      children,
      ...current
    };
  });
}
