import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";


export default function SucessModal() {
 const [visible, setVisible] = React.useState(false);
 const handler = () => setVisible(true);
 const closeHandler = () => {
  setVisible(false);
  console.log("closed");
 };
 return (
  <div>
   <Button auto color="warning" shadow onClick={handler}>
    Open modal
   </Button>
   <Modal
    closeButton
    blur
    aria-labelledby="modal-title"
    open={visible}
    onClose={closeHandler}
   >
    <Modal.Header>
     <Text id="modal-title" size={18}>
      Welcome to
      <Text b size={18}>
       NextUI
      </Text>
     </Text>
    </Modal.Header>
    <Modal.Body>
    </Modal.Body>
    <Modal.Footer>
     <Button auto flat color="sucess" onClick={closeHandler}>
      Continue
     </Button>
    </Modal.Footer>
   </Modal>
  </div>
 );
}
