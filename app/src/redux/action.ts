import * as departmentAction from "components/Department/redux/actions";
import * as articleAction from "components/Article/redux/actions";
import * as snackbarAction from "modules/Snackbar/redux/actions";
import * as dialogAction from "modules/Dialog/redux/actions";
import * as searchAction from "components/Search/redux/actions";

export default {
  department: departmentAction,
  article: articleAction,
  snackbar: snackbarAction,
  dialog: dialogAction,
  search: searchAction,
};
