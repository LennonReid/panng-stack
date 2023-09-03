
import { PubSub } from 'graphql-subscriptions'
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { INTERCOM_PUB_SUB } from './api-graphql-intercom.constants';
import { IntercomMessage } from './api-intercom-message';
import GraphQLJSON from 'graphql-type-json';

const MESSAGE_TRIGGER = 'MESSAGE_BUS_TRIGGER';
const SUBSCRIPTION_NAME = 'intercomSub';

@Resolver(() => IntercomMessage)
export class GraphQLIntercomResolver {
  constructor(@Inject(INTERCOM_PUB_SUB) private readonly pubsub: PubSub) {}

  @Mutation(() => IntercomMessage, { nullable: true })
  async intercomPub(
    @Args('type') type: string,
    @Args({ name: 'scope', nullable: true }) scope: string,
    @Args({ name: 'payload', type: () => GraphQLJSON, nullable: true }) payload: any,
  ): Promise<IntercomMessage | null> {
    await this.pubsub.publish(MESSAGE_TRIGGER, { [SUBSCRIPTION_NAME]: { type, scope, payload } });
    return { type, scope, payload };
  }

  @Subscription(() => IntercomMessage, {
    nullable: true,
    filter: (payload, variables) => {
      // No filters
      if (!payload || !payload[SUBSCRIPTION_NAME] || !variables) {
        return true;
      }
      const { type, scope } = variables;
      const hasType = type && payload[SUBSCRIPTION_NAME].type === type;
      const hasScope = scope && payload[SUBSCRIPTION_NAME].scope === scope;

      // type AND scope
      if (type && scope) {
        return hasType && hasScope;
      }
      if (!type && scope) {
        return hasScope;
      }
      if (type && !scope) {
        return hasType;
      }
      return true;
    },
  })
  async intercomSub(
    @Args({ name: 'type', nullable: true }) type: string,
    @Args({ name: 'scope', nullable: true }) scope: string,
  ): Promise<AsyncIterator<IntercomMessage | null>> {
    return this.pubsub.asyncIterator(MESSAGE_TRIGGER);
  }
}
