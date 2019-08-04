import React, { Component } from 'react';
import styles from './index.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default class SiteLayout extends Component {
    render() {
        return (
            <div className={styles.content}>
                {this.renderNavbar()}
                <div className={styles.pageWrapper}>
                    {this.props.children}
                </div>
                {this.renderFooter()}
            </div>
        )
    }

    renderNavbar() {
        return (
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