import { useDispatch, useSelector } from "react-redux"
import { onSetHoverSideBarLeft, onSetIconSideBarLeft } from "../store/uiSlice";

export const UiStore = () => {
    const{iconLeftSideHover,iconLeftValue} = useSelector(state => state.ui);
    const dispatch = useDispatch();


    const startOnChangeValueIconLeft = () => {
        iconLeftValue === 0 ? dispatch(onSetIconSideBarLeft({value:340})) : dispatch(onSetIconSideBarLeft({value:0}));
    }

    const startHoverValueIconLeft = () => {
      iconLeftValue === 0 ? dispatch( onSetHoverSideBarLeft({value:false})) : dispatch( onSetHoverSideBarLeft({value:true}));
    }

    
  return {
    iconLeftSideHover, iconLeftValue,
    startOnChangeValueIconLeft,
    startHoverValueIconLeft,

  }
}
