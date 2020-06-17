import React, { Fragment, useContext } from 'react'
import { BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import actions from '../redux/data/dataActions'
import actionsName from '../redux/dataNames/dataNamesActions'

import { DataContext } from './DataContext'
import Current from './Current'
import AddData from './AddData'
import Compare from './Compare'
import History from './History'

function Nav() {

    const { logInLogOutTransition } = useContext(DataContext)

    const toggleNav = () => {

        const nav = document.querySelector('.nav')

        nav.classList.toggle('nav--active')


        const lines = document.querySelectorAll('.hamburger__line')

        lines.forEach((line,index) => {
            line.classList.toggle(`hamburger__line${index+1}--active`)
        })


        const lis = document.querySelectorAll('nav li')

        lis.forEach(li => {

            li.addEventListener('click', () => {

                nav.classList.remove('nav--active')

                lines.forEach((line,index) => {
                    line.classList.remove(`hamburger__line${index+1}--active`)
                })

            })
        })

    }

    const dispatch = useDispatch()

    const logOut = () =>
    {
        logInLogOutTransition("wylogowano")
        dispatch(actions.clear())
        dispatch(actionsName.clear())
        sessionStorage.removeItem('token')
    }

    return (
        <Fragment>
            
            <Router>

                <div className="hamburger" onClick={toggleNav}>
                    <div className="hamburger__line hamburger__line1"></div>
                    <div className="hamburger__line hamburger__line2"></div>
                    <div className="hamburger__line hamburger__line3"></div>
                </div>

                <nav className="nav">
                    <ul>
                        <li><Link tabIndex="-1" to="/logged/current">aktualne</Link></li>
                        <li><Link tabIndex="-1" to="/logged/add-data">dodaj</Link></li>
                        <li><Link tabIndex="-1" to="/logged/compare">porównaj</Link></li>
                        <li><Link tabIndex="-1" to="/logged/history">historia</Link></li>
                        <li className="nav__logout" onClick={logOut}>wyloguj</li>
                    </ul>
                </nav>

                <Switch>

                    <Route path="/logged/current" component={Current}/>
                    <Route path="/logged/add-data" component={AddData}/>
                    <Route path="/logged/compare" component={Compare}/>
                    <Route path="/logged/history" component={History}/>

                </Switch>

            </Router>

        </Fragment>
    )
}

export default Nav

