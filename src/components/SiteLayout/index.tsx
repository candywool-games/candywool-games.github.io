import React, { Component } from 'react';
import styles from './index.module.scss';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';
import ScrollTop from 'react-scrolltop-button';
import { NavLink } from 'react-router-dom';

export default class SiteLayout extends Component {
    render() {
        return (
            <div className={styles.content}>
                {this.renderNavbar()}
                <div className={styles.pageWrapper}>
                    {this.props.children}
                </div>
                {this.renderFooter()}
                <ScrollTop
                    className={styles.scrollButton}
                    breakpoint={20000}
                    distance={150}
                    icon={
                        <FontAwesomeIcon 
                            icon={['fas', 'chevron-circle-up']} 
                            size="2x"
                        />
                    } 
                />
            </div>
        )
    }

    renderNavbar() {
        return (
            <div className={styles.navbarWrapper}>
                <Navbar variant="dark" expand="lg" className={styles.navbar}>
                    <LinkContainer to="">
                        <Navbar.Brand>Candywool Games</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <NavLink exact to="/" className="nav-link">Home</NavLink> */}
                            <NavLink exact to="/blog" className="nav-link">Blog</NavLink>
                        </Nav>
                        <Nav className={styles.socialLinks}>
                            <a href="https://twitter.com/oiseaudev" target="_blank" rel="noopener noreferrer" className="nav-link">
                                <FontAwesomeIcon
                                    icon={['fab', 'twitter']}
                                />
                            </a>
                            <a href="mailto:oiseaudev@gmail.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                                <FontAwesomeIcon
                                    icon={['fas', 'envelope']}
                                />
                            </a>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

    renderFooter() {
        return (
            <Navbar bg="dark" className={styles.footer}>
                <div className={styles.footerText}>
                    &copy; Copyright - Candywool Games 2019
                </div>
            </Navbar>
        );
    }
}