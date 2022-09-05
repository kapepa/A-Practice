import {UnauthorizedException} from "@nestjs/common";

export const AuthModuleMock = jest.fn().mockRejectedValue({
  login: jest.fn().mockRejectedValue({
    access_token: 'MyToken',
  } as { access_token: string } | UnauthorizedException)
})