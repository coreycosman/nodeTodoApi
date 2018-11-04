// import React, { Component } from "react";
// import { reduxForm, Field } from "redux-form";
// import { connect } from "react-redux";
// import * as actions from "../actions/logout-action";
// import { compose } from "redux"
//
// class Logout extends Component {
//   handleSubmit() {
//     this.props.logout(() => {
//       this.props.history.push('/');
//     });
//   };
//
//   render() {
//     // const { handleSubmit } = this.props;
//     return (
//       <li class="nav--list--item" >
//         <button onSubmit={ this.handleSubmit() }>
//           Logout
//         </button>
//       </li>
//     );
//   }
// }
//
// // function mapStateToProps(state) {
// //   return { errorMessage: state.auth.errorMessage };
// // }
//
// export default connect(null, actions)(Logout);
// // export default compose(
// //   connect(mapStateToProps, actions),
// //   reduxForm({
// //     form: 'logout'
// //   })
// // )(Logout);
