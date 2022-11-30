// This folder is for .json files
import activity from './Activity.json'
import backOfficer from './BackOfficer.json'
import collectingVehicle from './CollectingVehicle.json'
import collector from './Collector.json'
import janitor from './Janitor.json'
import mcp from './MCP.json'
import messages from './Messages.json'
import route from './Route.json'
import troller from './Troller.json'


export const activityData = activity.data
export const backOfficerData = backOfficer.data
export const collectingVehicleData = collectingVehicle.data
export const collectorData = collector.data
export const janitorData = janitor.data
export const mcpData = mcp.data
export const messagesData = messages.data
export const routeData = route.data
export const trollerData = troller.data

const data = {
    'activity': activityData,
    'backOfficer': backOfficerData,
    'collectingVehicle': collectingVehicleData,
    'collector': collectorData,
    'janitor': janitorData,
    'mcp': mcpData,
    'messages': messagesData,
    'route': routeData,
    'troller': trollerData,
}

export default data