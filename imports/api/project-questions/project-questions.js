import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

import { isModerator } from '/imports/api/user/methods'

const ProjectQuestions = new Mongo.Collection('projectQuestions')

SimpleSchema.extendOptions(['autoform']);

if (Meteor.isServer) {
    Meteor.publish('projectQuestions', function(projectID) {
        if (projectID) {
            return ProjectQuestions.find({ '_id': projectID, 'createdBy': this.userId })
        } else {
            return ProjectQuestions.find({ 'createdBy': this.userId });
        }
    })

    Meteor.publish('modProjectQuestions', (projectID) => {
        if (Meteor.userId() && isModerator(Meteor.userId())) {
            if (projectID) {
                return ProjectQuestions.find({
                    '_id': projectID
                })
            } else {
                return ProjectQuestions.find({})
            }
        }
    })
}


ProjectQuestions.schema = new SimpleSchema({
    problem_description: {
        type:  String,
        max: 300,
        autoform: {
            rows: 3
        },
        label: 'Please describe the observed problem that you are trying to solve (What is the value proposition?)'
    },
    possible_solution: {
        type:  String,
        max: 300,
        autoform: {
            rows: 3
        },
        label: 'What do you believe is the absolute simplest possible solution is to this problem?'
    },
    proposed_solution: {
        type:  String,
        max: 300,
        autoform: {
            rows: 3
        },
        label: 'What is your proposed solution to this problem?'
    },
    attempted_solution: {
        type:  String,
        max: 600,
        autoform: {
            rows: 5
        },
        label: 'Have you made any attempts to solve this problem? Describe what you\'ve done so far.'
    },
    is_solvable_by_traditional_db: {
        type: String,
        label: 'Is it possible to solve this problem with a traditional database instead of using a blockchain?',
        allowedValues: ['Yes', 'No', 'Possibly'],
        autoform: {
            type: 'select-radio',
            options: [
                {
                    label: 'Yes',
                    value: 'Yes'
                },
                {
                    label: 'No',
                    value: 'No'
                },
                {
                    label: 'Possibly',
                    value: 'Possibly'
                }
            ]
        }
    },
    blockchain_use_reason: {
        type:  String,
        max: 300,
        optional: true,
        autoform: {
            rows: 3
        },
        label: 'Why would you want to use a blockchain architecture to solve this problem?'
    },
    blockchain_requirement_reason: {
        type:  String,
        max: 300,
        optional: true,
        autoform: {
            rows: 3
        },
        label: 'Why can\'t this problem be solved without using a blockchain?'
    },
    blockchain_solution_proposal: {
        type:  String,
        max: 600,
        optional: true,
        autoform: {
            rows: 5
        },
        label: 'How exactly do you propose to use a blockchain architecture to solve this problem?'
    },
    ada_blockchain_aspects: {
        type:  String,
        max: 300,
        optional: true,
        autoform: {
            rows: 3
        },
        label: 'What aspects of the Cardano (ADA) blockchain ecosystem are necessary for you to build your proposed solution?'
    },
    target_market_size: {
        type:  String,
        max: 300,
        autoform: {
            rows: 3
        },
        label: 'How large is the market and what % are you trying to penetrate? '
    },
    target_market_regions: {
        type:  String,
        max: 300,
        autoform: {
            rows: 3
        },
        label: 'Which geographical regions are you trying to penetrate?'
    },
    competitors: {
        type:  String,
        max: 600,
        autoform: {
            rows: 5
        },
        label: 'Who are your non-blockchain/blockchain competitors?'
    },
    target_audience: {
        type:  String,
        max: 600,
        autoform: {
            rows: 5
        },
        label: 'Who will adopt this solution?'
    },
    prototype: {
        type:  String,
        max: 300,
        autoform: {
            rows: 3
        },
        label: 'Do you have a demo or prototype? Where can we see it?'
    },
    source_code_url: {
        type:  String,
        max: 300,
        label: 'Where can we see your existing codebase?'
    },
    development_roadmap: {
        type:  String,
        max: 300,
        autoform: {
            rows: 3
        },
        label: 'What is your development roadmap?'
    },
    project_website: {
        type:  String,
        max: 300,
        label: 'Do you have a website for your project? If so, please provide the URL'
    },
    business_plan: {
        type:  String,
        max: 300,
        autoform: {
            rows: 5
        },
        label: 'Do you have a lean business plan / white paper / roadmap?'
    },
    disruptive_solution_reason: {
        type:  String,
        max: 300,
        autoform: {
            rows: 5
        },
        label: 'Will this solution replace others? Explain why.'
    },
    user_onboarding_process: {
        type:  String,
        max: 300,
        autoform: {
            rows: 5
        },
        label: 'Describe your user onboarding process.'
    },
    project_token_type: {
        type:  String,
        max: 300,
        autoform: {
            rows: 5
        },
        label: 'In your opinion, is your project a security or a utility token?'
    },
    unfair_advantage_reason: {
        type:  String,
        max: 100,
        autoform: {
            rows: 2
        },
        label: 'Does your team have an "unfair" advantage?'
    },
    team_members: {
        type: Array
    },
    'team_members.$': {
        type: Object
    },
    'team_members.$.name': {
        type: String
    },
    'team_members.$.email': {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    createdBy: {
        type: String,
        label: 'Author',
        autoValue: function() {
            return this.userId || 'Test author'
        },
        autoform: {
            type: 'hidden'
        }
    },
    createdAt: {
        type: Number,
        label: 'Created At',
        autoValue: () => new Date().getTime(),
        autoform: {
            type: 'hidden'
        }
    }
}, { tracker: Tracker })

// 3. we have to attach the schema to our collection, otherwise AutoForm won't work correctly
ProjectQuestions.attachSchema(ProjectQuestions.schema)

export { ProjectQuestions }