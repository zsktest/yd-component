
import * as React from 'react';
import { Tree } from 'antd';

//import styles from './index.less';
import 'antd/es/tree/style/index';

const TreeNode = Tree.TreeNode;

export interface ItemProps {
  key: string;
  title: string;
  parentId: string;
}

export interface TreeProps extends ItemProps{
  children: Array<TreeProps>
}
export interface DepartmentTreeProps {
  selectNode: (key: string, title: string)=>void;
  selectMenu: (key: string, item:ItemProps, e: any)=>void;
  onDrop: (e:any)=>void;
  renderData: Array<TreeProps>
}

export const DepartmentTree = ({selectNode, selectMenu, onDrop, renderData }: DepartmentTreeProps)=>{
  
  const menuList = [{
    key: '1',
    title: '添加子部门'
  }, {
    key: '2',
    title: '编辑部门',
  }, {
    key: '3',
    title: '删除部门'
  }];

  let timer: NodeJS.Timeout = null;
 

  const onMouseEnter = (item: ItemProps, e:any)=>{
    let targetO = e.target;
    let offsetTop = targetO.offsetTop;
    let offsetLeft = targetO.offsetLeft;
    for (offsetTop= targetO.offsetTop, offsetLeft = targetO.offsetLeft; targetO = targetO.offsetParent;) {
        offsetTop += targetO.offsetTop;
        offsetLeft += targetO.offsetLeft;
    }
    offsetLeft = offsetLeft+20;
    const dropMenu = document.createElement('div');
    dropMenu.setAttribute('id', 'menuBoxId');
    dropMenu.setAttribute('style',`position: absolute;top: ${offsetTop}px;left: ${offsetLeft}px;width: 120px;max-height: 120px;overflow-y: auto;z-index: 100;background: #fff;border-radius: 3px;font-size: 12px;border: 1px solid rgba(0,0,0,.08);box-shadow: 1px 1px 3px #aaa;`);
    dropMenu.onmouseenter = function(e) {
      onMouseEnterItem()
    }
    dropMenu.onmouseleave = function(e) {
      onMouseLeaveItem()
    }
    menuList.forEach(ele=>{
      const menuItem = document.createElement('div');
      menuItem.setAttribute('class', 'menu-item-self');
      menuItem.innerHTML=ele.title;
      menuItem.onclick=function(e) {
        selectMenu(ele.key,item,e)
      };
      dropMenu.appendChild(menuItem);
    })
    
    document.getElementById('root')?.appendChild(dropMenu);
  }

  const onMouseLeave = (e:any)=>{
    timer = setTimeout(()=>{
      const hideElement = document.getElementById('menuBoxId');
      hideElement?.remove();
    }, 100); 
  }

  const onMouseEnterItem = ()=>{
    if(timer) clearTimeout(timer);
  }
  const onMouseLeaveItem = ()=>{
    const hideElement = document.getElementById('menuBoxId');
    hideElement?.remove();
  }

  const renderNode = (data:Array<TreeProps>)=>{
    return data.map(item=>{
      if(item.children && item.children.length>0) {
       return (<TreeNode key={item.key} title={
        <div 
          onClick={()=>selectNode(item.key, item.title)}>
          <span>{item.title}</span>
          <div style={{float: 'right'}} onMouseEnter={(e)=>onMouseEnter(item,e)} onMouseLeave={onMouseLeave}>
            <span>:::</span>
            {/* <div className="menu">
              {menuList.map(ele=><div className="menu-item" onMouseEnter={onMouseEnterItem} onMouseLeave={onMouseLeaveItem} onClick={(e)=>selectMenu(ele.key,item, e)}>{ele.title}</div>)}
            </div> */}
          </div>
        </div>}
       >
          {renderNode(item.children)}
        </TreeNode>)
      } else {
        return (<TreeNode key={item.key} title={
        <div 
          onClick={()=>selectNode(item.key, item.title)}>
          <span>{item.title}</span>
          <div style={{float: 'right'}}  onMouseEnter={(e)=>onMouseEnter(item,e)} onMouseLeave={onMouseLeave}>
            <span>:::</span>
            {/* <div className="menu">
              {menuList.map(ele=><div className="menu-item" onClick={(e)=>selectMenu(ele.key,item,e)}>{ele.title}</div>)}
            </div> */}
          </div>
        </div>}/>)
      } 

    })
  }

  const onDragStart = (e:any)=>{
    //console.log(e);
  }

  const onDragEnd = (e:any)=>{
    //console.log(e);
  }

  return (
    <Tree 
      onDrop={onDrop}
      onDragEnd = {onDragEnd}
      onDragStart={onDragStart}
      draggable={true}
      blockNode={true}
      defaultExpandAll={true}
      autoExpandParent={true}
      defaultSelectedKeys={[renderData[0].key.toString()]}
    >
      {renderNode(renderData)}
    </Tree>
  )
}