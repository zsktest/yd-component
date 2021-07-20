"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentTree = void 0;
const React = require("react");
const antd_1 = require("antd");
//import styles from './index.less';
require("antd/es/tree/style/index");
const TreeNode = antd_1.Tree.TreeNode;
const DepartmentTree = ({ selectNode, selectMenu, onDrop, renderData }) => {
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
    let timer = null;
    const onMouseEnter = (item, e) => {
        var _a;
        let targetO = e.target;
        let offsetTop = targetO.offsetTop;
        let offsetLeft = targetO.offsetLeft;
        for (offsetTop = targetO.offsetTop, offsetLeft = targetO.offsetLeft; targetO = targetO.offsetParent;) {
            offsetTop += targetO.offsetTop;
            offsetLeft += targetO.offsetLeft;
        }
        offsetLeft = offsetLeft + 20;
        const dropMenu = document.createElement('div');
        dropMenu.setAttribute('id', 'menuBoxId');
        dropMenu.setAttribute('style', `position: absolute;top: ${offsetTop}px;left: ${offsetLeft}px;width: 120px;max-height: 120px;overflow-y: auto;z-index: 100;background: #fff;border-radius: 3px;font-size: 12px;border: 1px solid rgba(0,0,0,.08);box-shadow: 1px 1px 3px #aaa;`);
        dropMenu.onmouseenter = function (e) {
            onMouseEnterItem();
        };
        dropMenu.onmouseleave = function (e) {
            onMouseLeaveItem();
        };
        menuList.forEach(ele => {
            const menuItem = document.createElement('div');
            menuItem.setAttribute('class', 'menu-item-self');
            menuItem.innerHTML = ele.title;
            menuItem.onclick = function (e) {
                selectMenu(ele.key, item, e);
            };
            dropMenu.appendChild(menuItem);
        });
        (_a = document.getElementById('root')) === null || _a === void 0 ? void 0 : _a.appendChild(dropMenu);
    };
    const onMouseLeave = (e) => {
        timer = setTimeout(() => {
            const hideElement = document.getElementById('menuBoxId');
            hideElement === null || hideElement === void 0 ? void 0 : hideElement.remove();
        }, 100);
    };
    const onMouseEnterItem = () => {
        if (timer)
            clearTimeout(timer);
    };
    const onMouseLeaveItem = () => {
        const hideElement = document.getElementById('menuBoxId');
        hideElement === null || hideElement === void 0 ? void 0 : hideElement.remove();
    };
    const renderNode = (data) => {
        return data.map(item => {
            if (item.children && item.children.length > 0) {
                return (React.createElement(TreeNode, { key: item.key, title: React.createElement("div", { onClick: () => selectNode(item.key, item.title) },
                        React.createElement("span", null, item.title),
                        React.createElement("div", { style: { float: 'right' }, onMouseEnter: (e) => onMouseEnter(item, e), onMouseLeave: onMouseLeave },
                            React.createElement("span", null, ":::"))) }, renderNode(item.children)));
            }
            else {
                return (React.createElement(TreeNode, { key: item.key, title: React.createElement("div", { onClick: () => selectNode(item.key, item.title) },
                        React.createElement("span", null, item.title),
                        React.createElement("div", { style: { float: 'right' }, onMouseEnter: (e) => onMouseEnter(item, e), onMouseLeave: onMouseLeave },
                            React.createElement("span", null, ":::"))) }));
            }
        });
    };
    const onDragStart = (e) => {
        //console.log(e);
    };
    const onDragEnd = (e) => {
        //console.log(e);
    };
    return (React.createElement(antd_1.Tree, { onDrop: onDrop, onDragEnd: onDragEnd, onDragStart: onDragStart, draggable: true, blockNode: true, defaultExpandAll: true, autoExpandParent: true, defaultSelectedKeys: [renderData[0].key.toString()] }, renderNode(renderData)));
};
exports.DepartmentTree = DepartmentTree;
