import {useState, useEffect} from 'react'
import { Form, Button } from "react-bootstrap"
import axios from 'axios';
import AddUserToProject from './AddUserToProject';
import { useNavigate } from 'react-router-dom';



const AddIssueForm = ({project}) => {
	const navigate = useNavigate();

	const [users, setUsers] = useState();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('');
	const [status, setStatus] = useState('');
	const [type, setType] = useState('');
	const [assignedTo, setAssignedTo] = useState();
	const [dueTo, setDueTo] = useState();
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		setUsers(project.team_members);
	}, [project.team_members]);

	const filterUsers = async (e) => {
		setFilterValue(e.target.value);
		if (e.target.value === '') {
			setUsers(project.team_members);
		} else {
			setUsers(project.team_members.filter(user=>user.username.includes(e.target.value)));
		}
	};

	const resetForm = () => {
		setName('');
		setDescription('');
		setAssignedTo();
		setPriority('');
		setStatus('');
		setType('');
		setAssignedTo();
		setDueTo('');
		
		filterValue('');
	}

	const createProject = async (e) => {
		e.preventDefault();

		const issue = {
			project : project.field,
			assigned_to: assignedTo,
			name : name,
			description : description,
			priority : priority,
			status : status,
			issue_type : type,
			due : dueTo,
		}

		const res = await axios.post("/tracker/create-issue/", issue, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		});

		navigate(`/project/${project.id}`);

		resetForm();
	}

	return (
		<>
			<Form onSubmit={createProject} className="mt-3">
				<Form.Group className="mb-3">
					<Form.Control type="text" value={name} placeholder="Issue name" onChange={(e) => setName(e.target.value)} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Control type="text" value={description} placeholder="Field name" onChange={(e) => setDescription(e.target.value)} />
				</Form.Group>
				<Form.Group className="mb-3" >
					<Form.Control type="text" value={filterValue || ""} placeholder="Assign project to..." onChange={filterUsers} />
					<div className="user-filter mt-2">
						{users?.map(u => <AddUserToProject key={u.id} user={u} selectedUsers={assignedTo} setSelectedUsers={setAssignedTo} onlyOne={true} />)}
					</div>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Select onChange={e=>setPriority(e.target.value)} value={priority}>
						<option value="h">Select a priority</option>
						<option value="h">High</option>
						<option value="m">Middle</option>
						<option value="l">Low</option>

					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Select onChange={e=>setStatus(e.target.value)} value={status}>
						<option value="h">Select a Status</option>
						<option value="o">Open</option>
						<option value="p">In progress</option>
						<option value="r">Resolved</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Select onChange={e=>setType(e.target.value)} value={type}>
						<option value="h">Select a type</option>
						<option value="i">Improve</option>
						<option value="t">Task</option>
						<option value="b">Bug</option>
						<option value="r">Request</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3">
                    <Form.Control type="datetime-local"  value={dueTo} onChange={(e)=>setDueTo(e.target.value)} placeholder="dd/mm/yyyy" required />
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
		</>
	)
}

export default AddIssueForm