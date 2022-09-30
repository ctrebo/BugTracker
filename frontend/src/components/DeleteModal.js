import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const DeleteModal = ({show, onHide, objectName, deleteObject}) => {
    return (
        <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
            <Container>
                <Row>
                    <Col xs={12} className="m-auto">
                        <h5 className="modal-title text-center mb-2" id="exampleModalLongTitle">Delete this {objectName}?</h5>
                        <p className="text-muted text-center">You won't be able to restore this {objectName} if you delete it!</p>
                    </Col>
                </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
                <Button onClick={onHide} variant="warning text-white">Abort</Button>
                <Button onClick={() => { deleteObject(); onHide();}} variant="danger">Delete</Button>
          </Modal.Footer>
        </Modal>
    );
}
export default DeleteModal
