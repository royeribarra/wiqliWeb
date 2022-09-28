const stateInicial = {
    timeOut: 5000,
    newestOnTop: true,
    position: "top-right",
    transitionIn: "bounceIn",
    transitionOut: "bounceOut",
    progressBar: false,
    closeOnToastrClick: false,
  };
  
  const toastr = (state = stateInicial, action) => {
    return state;
  };
  
  export default toastr;
  