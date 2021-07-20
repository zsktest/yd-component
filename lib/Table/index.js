"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const React = require("react");
// State is never set so we use the '{}' type.
// export class Table extends React.Component<ZskProps, {}> {
//     render() {
//         return <h1>Hello from {this.props.compiler} and {this.props.framework} tabel!</h1>;
//     }
// }
const Table = (props) => {
    return React.createElement("h1", null,
        "Hello from ",
        props.compiler,
        " and ",
        props.framework,
        " tabel!");
};
exports.Table = Table;
