## Explanation

### Deployment:

- Creates a deployment named `webapp-deployment` with one replica.
- Uses the container image `docker-image` which will be replaced by the actual image in the GitHub Actions workflow.
- Exposes port 3000 on the container.
- Uses the secret `ionossecretasad` for pulling the image from a private Docker registry.

### External Service (webapp-service):

- Exposes the deployment externally using a NodePort.
- The service listens on port 3000 and forwards traffic to port 3000 on the pod.
- The node port is set to 30001, making it accessible externally via the node's IP and this port.

### Internal Service (internal-service):

- Exposes the deployment internally within the cluster using a ClusterIP.
- The service listens on port 3000 and forwards traffic to port 3000 on the pod.
- This service is only accessible from within the cluster.

### Accessing the Services

- External Service: Accessible from outside the cluster using the node's IP and node port 30001.

    ``` http://<node-ip>:30001 ```
- Internal Service: Accessible only from within the cluster using the service name internal-service.

    ``` http://internal-service:3000 ```

### Example of external and internal communication
If you have another service or pod within the cluster that needs to communicate with the webapp application, it can use the internal service as follows (can be tested in terminal):

    curl http://internal-service:3000

and external service as follows (can be tested in terminal):

    curl http://85.215.135.68:30001

By defining multiple services in the same YAML file, you can manage both internal and external access to your application efficiently.