## Team-Building & Communication Sim in VR for Pair Programming

Pair programming is difficult because it requires clear communication. It's hard to practice clear communication.

So we asked ourselves how could we create a context that would encourage people to:

1. Listen and be heard in equal quantities
2. Quickly discern signal from noise
3. Emulate the sense of being confused and lost that debugging as a pair so often creates

We're build a shared reality experience where one user is at their laptop and the other user participates in first-person VR, using their laptop or, preferably, a headset.

Users assume the role of navigator or driver. The driver begins in an unknown location inside a burning building. The navigator sees a floor plan of the building.

Neither know the driver's location. They communicate only through real-time voice chat. The navigator and driver cooperate to lead the driver to safety before a timer runs out. We aim for the experience to last 3 to 5 minutes.

Our floor plans are randomly generated and unique each time. Floor plans are modeled as a graph, and we will use a graph algorithm to calculate the existence of an escape route. By calculating a minimum number of nodes for each escape route, users are given a unique experience but one of similar difficulty each time.

By modeling rooms as nodes, we can create obstacles in the routes when the floorplan to force the users to adapt to changing circumstance.

At the end, we will provide the pair with a transcript of their communication, a rating of how much each talked as a percentage of the conversation, and various ratings based on the text of their conversation including emotional valence.

### Tech Stack
Our tech stack is:

1. A-Frame
2. React, with A-Frame entities implemented as React components using React-Aframe
3. Websockets
4. Firebase for real-time database state updates
5. Web audio for real-time voice communication
6. Sequelize for accounts and persistent data and textual analysis
7. WebRTC
8. Google Voice to Text API
9. Google or IBM Watson for textual analysis

### MVP
Our MVP will include an un-styled 3D world with two users participating and real-time audio communication. We will also have at least a rough draft of our algorithm for generating routes from our node graph.
