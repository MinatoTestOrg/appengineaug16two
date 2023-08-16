export interface ApplicationUserBase {
	modifiedDate: Date;
	createdDate: Date;
	syncTime: number;
	sid: string;
	modifiedBy: string;
	appAdmin: Boolean;
	firstName: string;
	createdBy: string;
	lastName: string;
	email: string;
	userRoles: string;
uniqueId:string;
}