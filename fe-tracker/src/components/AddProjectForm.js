import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import axios from "axios";
import AddUserToProject from "./AddUserToProject";


const AddProjectForm = ({ logged_in_user, handleCloseAddProject, setProjects, projects }) => {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState('');
	const [field, setField] = useState('');
	const [picture, setPicture] = useState(null);
	const [filterValue, setFilterValue] = useState('');
	const [selectedUsers, setSelectedUsers] = useState([]);

	const fetchUsers = async () => {
		const res = await axios.get("tracker/users/", {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		});
		setUsers(res.data);
	};
	useState(() => {
		fetchUsers();		
	}, []);

	const filterUsers = async (e) => {
		setFilterValue(e.target.value);
		if (e.target.value === '') {
			fetchUsers();
		} else {
			const res = await axios.get(`tracker/userfilter/${e.target.value}/`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${localStorage.getItem('token')}`
				}
			});
			setUsers(res.data);
		}
	};

	const resetForm = () => {
		setName('');
		setField('');
		setFilterValue('');
		setPicture(null);
		fetchUsers();
		setSelectedUsers([]);
	}

	const createProject = async (e) => {
		e.preventDefault();

		const project = {
			name : name,
			field : field,
			team_members: (selectedUsers.length > 0 ? selectedUsers.join(" "): ""),
			creator : logged_in_user.username,
			picture : picture,
		}

		const res = await axios.post("/tracker/create-project/" ,project, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
		});

		setProjects([res.data, ...projects]);

		handleCloseAddProject();
	}

	return (
		<Form onSubmit={createProject}>
			<Form.Group className="mb-3">
				<Form.Control type="text" value={name} placeholder="Project name" onChange={(e) => setName(e.target.value)} />
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Control type="text" value={field} placeholder="Field name" onChange={(e) => setField(e.target.value)} />
			</Form.Group>
			<Form.Group className="mb-3" >
				<Form.Control type="text" value={filterValue || ""} placeholder="Add project members" onChange={filterUsers} />
				<div className="user-filter">
					{users.map(u => <AddUserToProject key={u.id} user={u} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} onlyOne={false} />)}
				</div>
			</Form.Group>
			<Form.Group className="mt-3">
				<Form.Control type="file" accept="image/jpeg,image/png,image/gif" onChange={(e) => setPicture(e.target.files[0])} />
			</Form.Group>
			<div className="mt-3">
				<Button variant="success" type="submit">
					Submit
				</Button>
				<Button variant="danger text-white ms-3" onClick={resetForm}>
					Reset
				</Button>
			</div>
		</Form>
	)
}

export default AddProjectForm;