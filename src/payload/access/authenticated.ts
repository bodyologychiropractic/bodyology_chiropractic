import type { Access, FieldAccess } from "payload";

export const authenticated: Access = ({ req }) => req.user != null;

export const authenticatedField: FieldAccess = ({ req }) => req.user != null;
