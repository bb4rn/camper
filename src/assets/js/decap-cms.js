// imports
import CMS from "decap-cms-app";
import "netlify-identity-widget";

// init
CMS.init();

// const hide = () => {
//     document.getElementsByClassName("campnotes")[0].style.display = "none"
// }

var ArrayControl = createClass({
  handleChange: function (e) {
    const separator = this.props.field.get("separator", ", ");
    this.props.onChange(e.target.value.split(separator));
  },

  render: function () {
    const separator = this.props.field.get("separator", ", ");
    var value = this.props.value;
    return h("input", {
      id: this.props.forID,
      className: this.props.classNameWrapper,
      type: "text",
      value: value ? value.join(separator) : "",
      onChange: this.handleChange,
    });
  },
});

var ArrayPreview = createClass({
  render: function () {
    return h(
      "ul",
      {},
      this.props.value.map(function (val, index) {
        return h("li", { key: index }, val);
      })
    );
  },
});

var schema = {
  properties: {
    separator: { type: "string" },
  },
};

CMS.registerWidget("array", ArrayControl, ArrayPreview, schema);
