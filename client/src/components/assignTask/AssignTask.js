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

          <label htmlFor="routes">Route:</label>
          <select name="routes" id="routes" onChange={HandleSeletecRoute}>
            {!routes.length ? <></>:
              routes.map((route, index) => 
              (<option key={index} value={route.id}>{route.name}</option>))}
          </select> 

          <div>{!selectedRoute.mcpList.length ? <></> :
            selectedRoute.mcpList
              .map(mcp => (<span>{mcp.name}</span>))
              .reduce((acc, x) => acc === null ? x : <>{acc} <span>{'>'}</span> {x}</>, null)
          }</div>

          <input type="submit" value="Submit"></input>

        </form>

      </>
    </>
  )
}

export default AssignTask