import {scraper} from '../utils/scraper.js'
import {saveResult} from '../controllers/resultsController.js'

const sources = [
    //Putting it in array as objects for future extensibility
    {
        url: 'https://devpost.com/hackathons',
        source: 'devpost',
        resultType: 'hackathon',
    },
    {
         url: 'https://mlh.io/seasons/2025/events',
        source: 'mlh',
        resultType: 'hackathon',
    },
    {
        url: 'https://www.ycombinator.com/jobs',
        source: 'ycombinator',
        resultType: 'job',
    },
    {
        url: 'https://www.opportunitydesk.org',
        source: 'opportunitydesk',
        resultType: 'scholarship',
    },
]

//Scrapes one source and saves to db
const processingSingleSource = asyncHandler(async (target, io) => {
    try {
        const scraped  = await scraper(target.url)

        const {data, isNew}  = await saveResult({
            ...scraped,
            source: target.source,
            resultType: target.resultType, //Skip classifier, type is already known from source
        })

        //Only broadcast if it's a new result, otherwise it would be spammy
        if (isNew && io) {
            
        }
    } catch (error) {

    }
})

