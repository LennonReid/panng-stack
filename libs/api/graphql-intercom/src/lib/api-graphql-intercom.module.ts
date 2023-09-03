import { Module } from "@nestjs/common";
import { INTERCOM_PUB_SUB } from "./api-graphql-intercom.constants";
import { GraphQLIntercomResolver } from "./api-graphql-intercom.resolver";

interface GraphQLIntercomModuleOptions {
  pubSub: any; // Replace 'any' with the appropriate type for pubSub
}

@Module({
  providers: [GraphQLIntercomResolver],
})
export class GraphQLIntercomModule {
  static forRoot(options: GraphQLIntercomModuleOptions) {
    return {
      module: GraphQLIntercomModule,
      providers: [
        { provide: INTERCOM_PUB_SUB, useValue: options.pubSub },
      ],
    };
  }
}
