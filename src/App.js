import '@fontsource/roboto/400.css';
import './App.css';
import React from "react";


import CV_data from "./CV_data";

import {Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import {getContiniousTenure, getExperienceTime, getTotalExperience, renderTenureTime} from "./utils";
import {CircleOutlined} from "@mui/icons-material";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'light', primary: {
            main: '#3f51b5',
        }, secondary: {
            main: '#f50057',
        },
    }, typography: {
        fontSize: 12,
    },
});


class CVMain extends React.Component {
    static propTypes = {
        name: PropTypes.string, surname: PropTypes.string, dob: PropTypes.string, experience: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.experience = new ExperienceTimeline();
    }

    renderExperienceItems() {
        return (
            <List>
                {this.experience.experiences.map((e) => this.renderExperienceItem(e))}
            </List>
        )
    }

    /**
     *
     * @param experienceItem
     * @type ExperienceItem
     *
     * @return JSX.Element
     */
    renderExperienceItem(experienceItem) {
        return ([
                <ListItem>
                    <CVExpItem experience={experienceItem}/>
                </ListItem>,
                <Divider variant="middle" component="li"/>,

            ]

        )
    }

    render() {
        return (
            <Grid>
                <Grid>
                    <Typography variant="h6" align="left">
                        Total experience: {renderTenureTime(this.experience.totalTenureConcurrent)}
                    </Typography>
                </Grid>
                <Grid>
                    <Divider variant="fullWidth"/>
                    {this.renderExperienceItems()}
                </Grid>

            </Grid>)
        // return this.renderExperienceItems()
    }
}

class ExperienceItem {
    constructor({
                    company, location, website, position, start_date, end_date, description, link_id, link_to
                }) {
        this.company_name = company
        this.location = location
        this.position = position
        this.start_date = {date: new Date(start_date), text: start_date}
        console.log(end_date)
        this.end_date = end_date === undefined ? {date: new Date(), text: "currently"} : {
            date: new Date(end_date), text: end_date
        }
        this.description = description
        this.link_id = link_id
        this.link_to = link_to

        if (website instanceof Array) {
            this.websiteIsActive = website[1]
            this.website = website[0]
        } else {
            this.websiteIsActive = true
            this.website = website
        }

        this.linkedPositions = []
    }

    addLinkedExperiences(...experiences) {
        this.linkedPositions.push(...experiences)
    }

    getCoreExperienceDuration() {
        return getExperienceTime(this.start_date.date, this.end_date.date)
    }

    getFullTimeline() {
        const timeline = [[this.start_date.text, this.end_date.text],];
        for (const linkedPosition of this.linkedPositions) {
            timeline.push([linkedPosition.start_date.text, linkedPosition.end_date.text])
        }

        return timeline
    }

    getTotalExperienceLength() {
        /**
         * @type Array[ExperienceItem]
         */
        let experiencesDurations = []
        experiencesDurations.push(this.getCoreExperienceDuration())

        for (const linkedPosition of this.linkedPositions) {
            experiencesDurations.push(linkedPosition.getCoreExperienceDuration())
        }

        return getTotalExperience(...experiencesDurations)
    }
}


class ExperienceTimeline {
    constructor(experienceItems) {
        experienceItems = CV_data.experience
        const expectedLinks = {}
        const links = {}
        let experiences = []
        let tenureCollection = []
        for (const experienceItem of experienceItems) {
            const expItem = new ExperienceItem(experienceItem)
            experiences.push(expItem)
            if (expItem.link_to != null) {
                expectedLinks[expItem.link_to] = expItem
            }
            if (expItem.link_id != null) {
                links[expItem.link_id] = expItem
            }
            tenureCollection.push(expItem.getCoreExperienceDuration())
        }
        this.totalTenureConcurrent = getTotalExperience(...tenureCollection)

        for (const expectedLinksKey in expectedLinks) {
            expectedLinks[expectedLinksKey].addLinkedExperiences(links[expectedLinksKey])
        }

        experiences.sort((a, b) => {
            return (a.start_date.date - b.start_date.date) * -1
        })

        let exps = experiences.map(e => [e.start_date.date, e.end_date.date]).reverse()
        this.totalTenureDirect = getContiniousTenure(...exps)



        this.experiences = experiences

    }


}

class CVExpItem extends React.Component {
    static propTypes = {
        experience: PropTypes.instanceOf(ExperienceItem)
    }

    constructor(props) {
        super(props);
        this.experience = props.experience
    }

    renderTimelineElement(pair) {
        return [<TimelineItem>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent>{pair[1]}</TimelineContent>
        </TimelineItem>, <TimelineItem>
            <TimelineSeparator>
                <TimelineDot/>
            </TimelineSeparator>
            <TimelineContent>{pair[0]}</TimelineContent>
        </TimelineItem>]
    }

    renderTimeline() {
        const timeline = this.experience.getFullTimeline()
        let content = []
        for (const timelineElement of timeline) {
            content.push(...this.renderTimelineElement(timelineElement))
        }
        return (<Timeline>
            {content}
        </Timeline>)
    }

    renderDescription() {
        return (<List>
            {this.experience.description.map(line => <ListItem disablePadding>
                <ListItemIcon>
                    <CircleOutlined/>
                </ListItemIcon>
                <ListItemText>
                    {line}
                </ListItemText>
            </ListItem>)}
        </List>)
    }


    renderWebsite() {
        if (this.experience.website === undefined)
            return ""
        return (
            <Typography>{"Website: "}
                {this.experience.websiteIsActive ?
                    <a href={"http://" + this.experience.website}>{this.experience.website}</a>
                    :
                    this.experience.website
                }
            </Typography>
        )
    }

    render() {
        return (<Grid container spacing={2}>
            <Grid item xs={2}>
                <Typography>
                    {renderTenureTime(this.experience.getTotalExperienceLength())}
                </Typography>
                <Timeline>
                    {this.renderTimeline()}
                </Timeline>
            </Grid>
            <Grid item xs={7}>
                <Typography variant="h6" align="left">
                    {this.experience.position}, {this.experience.company_name}
                </Typography>
                {this.renderWebsite()}

                {/*<Typography variant="subtitle1">asdsd</Typography>*/}
                <Typography variant="body1">
                    {this.renderDescription()}
                </Typography>
            </Grid>
        </Grid>)
    }
}

function App() {
    return (<div className="App">
        <ThemeProvider theme={theme}>
            {/*<CVExpItem/>*/}
            <CVMain/>
        </ThemeProvider>
    </div>);
}

export default App;
