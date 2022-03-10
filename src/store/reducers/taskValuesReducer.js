import { UPDATE_FORM_VALUES,RESET_FORM_VALUES } from "../actions/types";

const initialValues = {
   
    // title: "",
    // description: "",
    // start_date: "",
    // dead_line: "",
    // priority:{id:'',title:''},
    // assigned_to:{id:'',title:''},
    // status:{id:'',title:''},
    title: "",
    description: "",
    start_date: "",
    dead_line: "",
    priority:"",
    assigned_to:"",
    status:"",
  }
  const taskValuesReducer = (state=initialValues,action)=>{
      switch (action.type) {
          case UPDATE_FORM_VALUES:
              return action.payload
              case RESET_FORM_VALUES:
                return initialValues
          default:
             return state
      }
  }
  export default taskValuesReducer