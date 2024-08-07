# Busybox Examples for Kubernetes Debugging

(obviously you first need to exec into the busybox container)
Busybox is a versatile tool for debugging in Kubernetes environments. Here are some common examples of how to use Busybox in your debugging sessions:

1. Network Connectivity Testing:
   ```bash
   # Ping a service or external endpoint
   ping google.com

   # Test DNS resolution
   nslookup kubernetes.default.svc.cluster.local

   # Check network routes
   route -n
   ```

2. File System Operations:
   ```bash
   # List directory contents
   ls -la /path/to/directory

   # Create a test file
   echo "Test content" > /tmp/testfile.txt

   # View file contents
   cat /tmp/testfile.txt
   ```

3. Process Management:
   ```bash
   # List running processes
   ps aux

   # Check system resource usage
   top
   ```

4. Network Diagnostics:
   ```bash
   # View network interfaces
   ifconfig

   # Check open ports and connections
   netstat -tuln
   ```

5. Text Processing:
   ```bash
   # Search for a pattern in a file
   grep "error" /var/log/app.log

   # Simple text manipulation
   echo "Hello, Kubernetes" | sed 's/Kubernetes/Busybox/'
   ```

6. System Information:
   ```bash
   # View system information
   uname -a

   # Check available disk space
   df -h
   ```

To use these commands, first exec into your Busybox container:
