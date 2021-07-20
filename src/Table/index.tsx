import * as React from "react";

export interface ZskProps { compiler: string; framework: string; }// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
// export class Table extends React.Component<ZskProps, {}> {
//     render() {
//         return <h1>Hello from {this.props.compiler} and {this.props.framework} tabel!</h1>;
//     }
// }

export const Table = (props: ZskProps) => {
  return <h1>Hello from {props.compiler} and {props.framework} tabel!</h1>;
}