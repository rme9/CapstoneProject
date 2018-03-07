package com.scavenger.restservice;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/location")
public class LocationService {

	@GET
	@Produces(MediaType.TEXT_HTML)
	public String sayHtmlHello() {
	return "Hello from Jersey";
	}	
	
}
