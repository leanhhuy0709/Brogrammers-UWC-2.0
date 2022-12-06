import React, { useState} from 'react'
import Navbar from '../navbar/Navbar';
import data from '../../model/api/api';

const AssignTask = () => {
  const [trucks, setTrucks] = useState(data.TruckAPI.all())
  const [collectors, setCollectors] = useState(data.CollectorAPI.all())
  const [routes, setRoutes] = useState(() => {
    return data.RouteAPI.all().map((route) => {
      const mcpIdList =  route.MCPIdList
      const mcpList =  mcpIdList.map((mcpId) => data.mcpAPI.get_by_id(mcpId))
      return {
        "id": route.id,
        "name": `Route ${route.id}`,
        "estimateTime": route.estimateTime,
        "mcpList": mcpList
      }
    })
  })

  const [selectedRoute, setSelectedRoute] = useState(routes[0])

  const HandleSeletecRoute = (e) => {
    const routeId = e.target.value
    setSelectedRoute(routes.find(ele => ele.id === routeId))
  }


  return (
    <>
      <Navbar></Navbar>
      <>
        <div>AssignTask</div>
        <form>
          <div>1. Choose collector and truck</div>
          <div>Choose a collector to perform this task, along with a truck</div>

          <label htmlFor="collectors">Username:</label>
          <select name="collectors" id="collectors">
            {!collectors.length ? <></>:
              collectors.map((collector, index) => 
              (<option key={index} value={collector.id}>{collector.username}</option>))}
          </select>

          <label htmlFor="vehicles">VehicleID:</label>
          <select name="vehicles" id="vehicles">
            {!trucks.length ? <></>:
              trucks.map((vehicle, index) => 
              (<option key={index} value={vehicle.id}>{vehicle.id}</option>))}
          </select> 

          
          <div>2. Choose a route</div>
          <div>Choose a route for the selected collector to work on</div>

          <label htmlFor="routes">Route:</label>
          <select name="routes" id="routes" onChange={HandleSeletecRoute}>
            {!routes.length ? <></>:
              routes.map((route, index) => 
              (<option key={index} value={route.id}>{route.name}: {route.mcpList.at(0).name} - {route.mcpList.at(-1).name}</option>))}
          </select> 

          <div>{!selectedRoute.mcpList.length ? <></> :
            selectedRoute.mcpList
              .map(mcp => {
                // remember to replace color !!!
                if(mcp.percentage <= 40)
                  return <span style={{color: "green"}}>{mcp.name} ({mcp.percentage}%)</span>
                else if(mcp.percentage <= 60)
                  return <span style={{color: "yellow"}}>{mcp.name} ({mcp.percentage}%)</span>
                else if(mcp.percentage <= 80)
                  return <span style={{color: "orange"}}>{mcp.name} ({mcp.percentage}%)</span>
                else
                  return <span style={{color: "red"}}>{mcp.name} ({mcp.percentage}%)</span>
              })
              .reduce((acc, x) => acc === null ? x : <>{acc} <span>{'>'}</span> {x}</>, null)
          }</div>

          <div>Estimated time of completion: {selectedRoute.estimateTime} hours</div>

          <input type="submit" value="Submit"></input>

        </form>

      </>
    </>
  )
}

export default AssignTask