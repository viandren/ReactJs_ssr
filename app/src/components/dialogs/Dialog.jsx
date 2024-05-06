
import './Dialog.css';

import React from "react";
import {PortalWithState} from "react-portal";


export default function Dialog(props) {


    return  <>
        {props.dialogIsOpen && (
      <PortalWithState closeOnOutsideClick closeOnEsc node={document.getElementsByClassName("app")}>
        {({ openPortal, closePortal, isOpen, portal }) => {
          return <div data-testid="dialog">
            <div className="portal">
            <button className="close-dialog" onClick={props.closeDialog} data-testid="closeDialogButton">x</button>
            <h2 className="dialog-title">{props.title}</h2>
                {props.children}
            </div>
            </div>
        }}
        </PortalWithState>)}
    </>;
}