import * as departmentAction from "components/Department/redux/actions";
import * as articleAction from "components/Article/redux/actions";
import * as snackbarAction from "modules/Snackbar/redux/actions";
import * as homeAction from "components/Home/redux/actions";

export default {
  department: departmentAction,
  article: articleAction,
  snackbar: snackbarAction,
  home: homeAction,
};
