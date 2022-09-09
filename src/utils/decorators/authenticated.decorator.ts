export function Authenticated(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalValue = descriptor.value;

  descriptor.value = function (...args: any[]) {
    // "this" here will refer to the class instance
    console.log(this.constructor.name);

    return originalValue.apply(this, args);
  };
}
