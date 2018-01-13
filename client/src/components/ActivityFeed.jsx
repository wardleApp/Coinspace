import React from 'react';
import { Card, Feed, Divider, Icon } from 'semantic-ui-react';

const ActivityFeed = (props) => {
  return (
  <Card id="dashCard" className="ui blue raised link">
    <Card.Content>
      <Card.Header>
        Your Recent Activities
      </Card.Header>
      <Divider>
      </Divider>

      <Feed>
        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              <Icon color="blue" circular name="dollar"></Icon> Purchased 20.25 Ethereum<Icon name="sort"></Icon> @ $1,288.00 USD on 1/12/2018
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              <Icon color="blue" circular name="remove"></Icon> Sold 1.15 BitCoin<Icon name="bitcoin"></Icon> @ $14,070.20 USD on 1/12/2018
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              <Icon color="blue" circular name="remove"></Icon> Sold 10 BitCoin <Icon name="bitcoin"></Icon> @ $1,744.17 USD on 5/15/2018
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              <Icon color="blue" circular name="dollar"></Icon> Purchased 108.75 Ethereum<Icon name="sort"></Icon> @ $46.49 USD on 4/12/2017
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>

    </Card.Content>

  </Card>
  )
};

export default ActivityFeed;