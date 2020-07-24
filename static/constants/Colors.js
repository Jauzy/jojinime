export var MAIN = '#00ADB5'
export var SECONDARY = '#2D2D2D'
export var LIGHTSECONDARY = '#343A40'
export var DARKSECONDARY = '#222'

export const changeMainColor = (newColor) => {
    MAIN = newColor
    document.documentElement.style.setProperty('--main-color', newColor);
}

export const changeSecondaryColor = (newColor) => {
    SECONDARY = newColor
}

export const changeLightSecondaryColor = (newColor) => {
    LIGHTSECONDARY = newColor
}


//     <Route exact path={ROUTES.ABOUT} component={About} />

//     <Route exact path={ROUTES.LOGINUSER} component={LoginUser} />
//     <Route exact path={ROUTES.DASHBOARDUSER} component={DashboardUser} />
//     <Route exact path={ROUTES.PROFILEUSERPUBLIC} component={PublicProfile} />
//     <Route exact path={ROUTES.CHATROOM} component={Chatroom} />

//     <Route exact path={ROUTES.SEARCHGENRE} component={SearchGenre} />
//     <Route path={ROUTES.SEARCHANIME} component={SearchAnime} />
//     <Route exact path={ROUTES.ONGOINGLIST} component={Ongoing} />
//     <Route exact path={ROUTES.MOVIELIST} component={Movie} />
//     <Route exact path={ROUTES.COMPLETEDLIST} component={Completed} />

//     <Route exact path={ROUTES.ANIMEDASHBOARD} component={AnimeDashboard} />
//     <Route exact path={ROUTES.LOGINADMIN} component={LoginAdmin} />
//     <Route exact path={ROUTES.EPISODEEDIT} component={EpisodeEdit} />
//     <Route exact path={ROUTES.ADMINDASHBOARD} component={AdminDashboard} />
//     <Route component={Page404} />