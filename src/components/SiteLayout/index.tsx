import React, { Component } from 'react';
import styles from './index.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollTop from 'react-scrolltop-button';

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
                <Navbar bg="primary" variant="dark" expand="lg" className={styles.navbar}>
                    <Link to="">
                        <Navbar.Brand>Candywool Games</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink exact to="/blog" className="nav-link">Blog</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

    renderFooter() {
        return(
            <Navbar bg="secondary" className={styles.footer}>
                <div className={styles.footerText}>
                    &copy; Copyright - Candywool Games 2019
                </div>
            </Navbar>
        );
    }
}