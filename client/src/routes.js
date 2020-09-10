import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { CreatePage } from './pages/CreatePage';
import { NotesPage } from './pages/NotesPage';
import { DetailPage } from './pages/DetailPage';


export const UseRoutes = () => {
    return (
        <Switch>
            <Route path="/create" exact>
                <CreatePage />
            </Route>
            <Route path="/notes" exact>
                <NotesPage />
            </Route>
            <Route path="/notes/:id">
                <DetailPage />
            </Route>
            <Redirect to="/create" />
        </Switch>
    )
}