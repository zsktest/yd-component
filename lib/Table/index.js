"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const React = require("react");
// State is never set so we use the '{}' type.
class Table extends React.Component {
    render() {
        return React.createElement("h1", null,
            "Hello from ",
            this.props.compiler,
            " and ",
            this.props.framework,
            " tabel!");
    }
}
exports.Table = Table;
