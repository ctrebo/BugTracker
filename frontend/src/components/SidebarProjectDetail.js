import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from 'react-bootstrap';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { useNavigate } from "react-router-dom";

import '@trendmicro/react-sidenav/dist/react-sidenav.css';



const SidebarProjectDetail = ({project_id}) => {

	const navigate = useNavigate();

	const size_to_show_left_sidebar = 850;
	const [showLeftSidebar, setShowLeftSidebar] = useState(window.innerWidth > size_to_show_left_sidebar);

	const updateMedia = () => {
		setShowLeftSidebar(window.innerWidth > size_to_show_left_sidebar);
	};

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	return (
		<>
			{showLeftSidebar ? (
				<SideNav className="" >
					<SideNav.Toggle className="" />
					<SideNav.Nav>
						<NavItem eventKey="home" onClick={()=>navigate(`/project/${project_id}`)}>
							<NavIcon>
								<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
							</NavIcon>
							<NavText>
								Home
							</NavText>
						</NavItem>
						<NavItem eventKey="file" onClick={()=>navigate(`/project/${project_id}/issues`)}>
							<NavIcon>
								<i className="fa fa-fw fa-file" style={{ fontSize: '1.75em' }} />
							</NavIcon>
							<NavText>
								Issues
							</NavText>
						</NavItem>
						<NavItem eventKey="plus" onClick={()=>navigate(`/project/${project_id}/issues/add`)} >
							<NavIcon>
								<i className="fa fa-fw fa-plus" style={{ fontSize: '1.75em' }} />
							</NavIcon>
							<NavText>
								Add Issue
							</NavText>
						</NavItem>
					</SideNav.Nav>
				</SideNav>
			) : (
				<Navbar fixed="bottom" className="sidebar-phone">
					<Container className="justify-content-around">
						<Link className="mynav-linkbottom" to={`/project/${project_id}`}>
							<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
						</Link>
						<Link className='mynav-linkbottom' to={`/project/${project_id}/issues`}>
							<i className="fa fa-fw fa-file" style={{ fontSize: '1.75em' }} />
						</Link>
						<Link className='mynav-linkbottom' to={`/project/${project_id}/issues/add`}>
							<i className="fa fa-fw fa-plus" style={{ fontSize: '1.75em' }} />
						</Link>
					</Container>
				</Navbar>
			)
			}
		</>
	);
};

export default SidebarProjectDetail;
