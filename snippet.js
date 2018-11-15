var ldUserName = GetLocationByCode("xx.landesk.username", cafeHost, "xx.landesk","propertygroups");
                       
function GetLocationByCode(locationID, cafeHost, propertyGroupName,propertyType)//propertyType = propertygroups / propertydefinitions
{
            if (!cafeHost) {
                            throw "Missing cafeHost";
            }
            var location = "";
            var propLocationFlag = false;
            var propNewLocationFlag = false;
            var restClient = cafeHost.createRestClient("com.vmware.csp.core.properties.service.api");
            var resp = restClient.get(propertyType);
            var jsObject = resp.getBodyAsJson();
            var body = resp.getBodyAsJson();
            var content = body['content'];
            for (var i = 0; i < content.length; i++)
            {
                        var val = content[i].label;
                        System.log(val);
                        if (content[i].label !== content[i].id)
        {
           val += " [id=" + content[i].id + "]";
                                    //System.log(val);
        }
                       
        if(content[i].label == propertyGroupName)
        {
                                   
            propLocationFlag = true;
           
                                    System.log("Location Property Definition Found");
            System.log(val);    
                                    //for(var j=0; j<content[i].properties.count; j++)          
                    //{
                                    //System.log("# of Properties Items in Group :"+JSON.stringify(content[i].properties));
                                    try{
                                    //System.log("Is Encrypted : " + content[i].properties.keys);
                                                location = content[i].properties[locationID].facets.defaultValue.value.value; 
                                                System.log(location);
                                                if((location.length != returnStrCount) && (returnStrCount !=0) )
                                                {
                                                            i++;
                                                            location = content[i].properties[locationID].facets.defaultValue.value.value; 
                                               
                                                }
                                                            
                        }catch (ex)
                                    {
                                    System.error(ex);
                                    }         
                                    if(location != "")
                                                {         
                                                            //System.log("location: " + location);
                                                            propNewLocationFlag = true;
                                                }
                                    //}
            }  
            }
           
            if(!propNewLocationFlag)
            {
                        System.log("New location is not added to \""+propertyGroupName+"\" property definition.");             
            }
            if (!propLocationFlag)
            {
                        System.log("\""+propertyGroupName+"\" definition property is not defined.");
            }
           
            return location;
}