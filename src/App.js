import logo from './logo.svg';
import './App.css';
import React from "react";


import CV_data from "./CV_data";

import {Box, Grid} from "@mui/material";
import PropTypes, {instanceOf} from "prop-types";
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import {getExperienceTime, getTotalExperience} from "./utils";


class CVExpItem extends React.Component {
    propTypes = {
        company: PropTypes.string,
        location: PropTypes.string,
        isRemote: PropTypes.bool,
        position: PropTypes.string,

    }

    constructor(props) {
        super(props);
        this.data = CV_data.experience[0];
        let x = new ExperienceTimeline();
    }

    renderTimelineElement(pair) {
        return [
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>{pair[0]}</TimelineContent>
            </TimelineItem>,
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot/>
                </TimelineSeparator>
                <TimelineContent>{pair[1]}</TimelineContent>
            </TimelineItem>
        ]
    }

    renderTimeline(timeline) {
        timeline = [
            ["Aug 2023", "May 2021"],
            ["Jan 2021", "Sep 2020"],
            ["Nov 1998", "Jan 1996"]
        ]
        let content = []
        for (const timelineElement of timeline) {
            content.push(...this.renderTimelineElement(timelineElement))
        }
        return (
            <Timeline>
                {content}
            </Timeline>
        )
    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h3>5 Years</h3>
                    <Timeline>
                        {this.renderTimeline()}
                    </Timeline>
                </Grid>
                <Grid item xs={8}></Grid>
            </Grid>
        )
    }
}

class CVMain extends React.Component {
    propTypes = {
        name: PropTypes.string,
        surname: PropTypes.string,
        dob: PropTypes.string,
        experience: PropTypes.object
    }

    constructor(props) {
        super(props);
    }
}

class ExperienceItem {
    constructor(
        {
            company,
            location,
            website,
            position,
            start_date,
            end_date,
            description,
            link_id,
            link_to
        }
    ) {
        console.log(company)
        this.company_name = company
        this.location = location
        this.position = position
        this.start_date = new Date(start_date)
        this.end_date = new Date(end_date)
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
        return getExperienceTime(this.start_date, this.end_date)
    }

    getTotalExperienceLength() {
        let experiencesDurations = []
        experiencesDurations.push(this.getCoreExperienceDuration())

        for (const linkedPosition of this.linkedPositions) {
            experiencesDurations.push(linkedPosition.getCoreExperienceDuration())
        }

        return getTotalExperience(experiencesDurations)
    }
}


class ExperienceTimeline {
    constructor(experienceItems) {
        experienceItems = CV_data.experience
        const expectedLinks = {}
        const links = {}
        let experiences = []
        for (const experienceItem of experienceItems) {
            console.log(experienceItem)
            const expItem = new ExperienceItem(experienceItem)
            experiences.push(expItem)
            if (expItem.link_to != null) {
                expectedLinks[expItem.link_to] = expItem
            }
            if (expItem.link_id != null) {
                links[expItem.link_id] = expItem
            }
        }

        for (const expectedLinksKey in expectedLinks) {
            expectedLinks[expectedLinksKey].addLinkedExperiences(links[expectedLinksKey])
        }

        experiences.sort(
            (a, b) => {
                if (a.start_date > b.start_date)
                    return 1
                if (a.start_date === b.start_date)
                    return 0
                return -1
            }
        )

        console.log(experiences)
        this.experiences = experiences

    }


}

function App() {
    return (
        <div className="App">
            <CVExpItem/>
            {/*<CVMain />*/}
        </div>
    );
}

export default App;
