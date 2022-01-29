import { Grid } from "@chakra-ui/react";
import Individual from "./Individual";

function Team(){
    return (
        <Grid
        gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}
        justifyContent="space-evenly"
        gap={["1.5rem", "3rem"]}
        mt="12"
      >
        <Individual 
          name="John Smith"
          position="Position"
          imgSrc="/img/sample-user.png"
        />
        <Individual 
          name="Jennifer Allen"
          position="Position"
          imgSrc="/img/sample-user.png"
        />
        <Individual 
          name="Lamar Stan"
          position="Position"
          imgSrc="/img/sample-user.png"
        />
        <Individual 
          name="Jamal Tron"
          position="Position"
          imgSrc="/img/sample-user.png"
        />
        <Individual 
          name="Foo Bar"
          position="Position"
          imgSrc="/img/sample-user.png"
        />
        <Individual 
          name="John Smith"
          position="Position"
          imgSrc="/img/sample-user.png"
        />
      </Grid>
    )
}

export default Team;