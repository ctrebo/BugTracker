import React from 'react'
import { useMemo } from 'react'
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';



const AddUserToProject = ({ selectedUsers, setSelectedUsers, user, onlyOne }) => {
    
    const isActive = useMemo(()=> {
        if (onlyOne) {
            return selectedUsers === user.username;
        } else {
            return selectedUsers.includes(user.id);
        }
        
    }, [selectedUsers]);

    const addOrRemoveSelected = (e) => {
        if(onlyOne) {
            if(selectedUsers === user.username) {

            } else {
                setSelectedUsers(user.username);
            }
        } else {
            if (!selectedUsers.includes(user.id)) {
                setSelectedUsers([...selectedUsers, user.id]);
            } else {
                setSelectedUsers(selectedUsers.filter(id => id !== user.id));
            }   
        }
    };
    return (
        <div className='w-100'>
            <section onClick={addOrRemoveSelected} className={isActive ? 'yellow-shade border-green' : ''}>
                <article>
                    <Row className="mx-0 border py-2">
                        <Col xs={2}>
                            <div className="img-project-wrap cursor-pointer">
                                <img src={user.prof_pic} className="img-fluid w-100 h-100" alt="" />
                            </div>
                        </Col>
                        <Col xs={10}>
                            <div>
                                <header>
                                    <p className="text-decoration-none">{user.username}</p>
                                </header>                            
                            </div>
                        </Col>
                    </Row>
                </article>
            </section>
        </div>

    )
}

AddUserToProject.propTypes = {
    onlyOne: PropTypes.bool
};

export default AddUserToProject