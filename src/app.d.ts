// Add types for Locals
declare global {
	namespace App {
	  interface Locals {
		user?: {
		  id: number;
		  email: string;
		  username: string;
		}
	  }
	}
  }
  
  export {};
  