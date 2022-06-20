import React from 'react'
import { useMemo } from 'react'
import { Row, Col } from 'react-bootstrap';


const AddUserToProject = ({ selectedUsers, setSelectedUsers, user }) => {
    
    const isActive = useMemo(()=> {
        return selectedUsers.includes(user);
    }, [selectedUsers]);

    const addOrRemoveSelected = (e) => {
        if (!selectedUsers.includes(user)) {
            setSelectedUsers([...selectedUsers, user]);
        } else {
            setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
        }
        console.log();
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

export default AddUserToProject