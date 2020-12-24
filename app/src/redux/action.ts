import * as departmentAction from "components/Department/redux/actions";
import * as articleAction from "components/Article/redux/actions";
import * as snackbarAction from "modules/Snackbar/redux/actions";
import * as localStorageAction from "modules/localStorage/redux/actions";

export default {
  department: departmentAction,
  article: articleAction,
  snackbar: snackbarAction,
  localStorage: localStorageAction,
};
