/// <reference types="react" />
import 'antd/es/tree/style/index';
export interface ItemProps {
    key: string;
    title: string;
    parentId: string;
}
export interface TreeProps extends ItemProps {
    children: Array<TreeProps>;
}
export interface DepartmentTreeProps {
    selectNode: (key: string, title: string) => void;
    selectMenu: (key: string, item: ItemProps, e: any) => void;
    onDrop: (e: any) => void;
    renderData: Array<TreeProps>;
}
export declare const DepartmentTree: ({ selectNode, selectMenu, onDrop, renderData }: DepartmentTreeProps) => JSX.Element;
