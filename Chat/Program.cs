using System.Text;
using System.Net;
using System.Net.Sockets;

namespace Chat
{
    class Program
    {
        public enum ConnectStatus
        {
            Loading = 0, Connected = 1, Disconnected = 2
        }
        static int localPort;
        static int remotePort;
        static List<int> remoteAddresses = new List<int>();
        static Socket listeningSocket;
        static List<string> chatHistory = new List<string>();
        static ConnectStatus connect = ConnectStatus.Loading;

        static void Main(string[] args)
        {
            Console.Write("Enter local port: ");
            localPort = Int32.Parse(Console.ReadLine());
            string service = "";
            while (service != "<Create>" && service != "<Connect>")
            {
                Console.WriteLine("Enter <Create> if you want to create group chat "
                    + "and <Connect> if you want to connect the chat.");
                service = Console.ReadLine();
            }
            if (service == "<Create>")
                CreateGroupChat();
            else
                ConnectToChat();
        }

        private static void CreateGroupChat()
        {
            Console.WriteLine("Waiting for claims");
            Console.WriteLine();

            try
            {
                listeningSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
                ServerListen();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                Close();
            }
        }

        private static void ConnectToChat()
        {
            try
            {
                while (true)
                {
                    Console.Write("Enter remote port: ");
                    remotePort = Int32.Parse(Console.ReadLine());
                    Console.WriteLine("Wait...");

                    listeningSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);

                    Task listeningTask = new Task(ClientListen);
                    listeningTask.Start();

                    Thread.Sleep(70);
                    byte[] _data = Encoding.Unicode.GetBytes("<Connect>");
                    EndPoint _remotePoint = new IPEndPoint(IPAddress.Parse("127.0.0.1"), remotePort);
                    listeningSocket.SendTo(_data, _remotePoint);

                    while (true)
                    {
                        string message;

                        if (connect == ConnectStatus.Disconnected)
                            break;
                        else
                            message = Console.ReadLine();

                        if (connect == ConnectStatus.Connected)
                        {
                            byte[] data = Encoding.Unicode.GetBytes(message);
                            EndPoint remotePoint = new IPEndPoint(IPAddress.Parse("127.0.0.1"), remotePort);
                            listeningSocket.SendTo(data, remotePoint);
                        }
                    }

                    connect = ConnectStatus.Loading;
                    Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                Close();
            }
        }

        private static void ServerListen()
        {
            try
            {
                IPEndPoint localIP = new IPEndPoint(IPAddress.Parse("127.0.0.1"), localPort);
                listeningSocket.Bind(localIP);

                while (true)
                {
                    StringBuilder builder = new StringBuilder();
                    int bytes = 0;
                    byte[] data = new byte[256];

                    EndPoint remoteIp = new IPEndPoint(IPAddress.Any, 0);

                    do
                    {
                        bytes = listeningSocket.ReceiveFrom(data, ref remoteIp);
                        builder.Append(Encoding.Unicode.GetString(data, 0, bytes));
                    }
                    while (listeningSocket.Available > 0);

                    IPEndPoint remoteFullIp = remoteIp as IPEndPoint;

                    if (builder.ToString().Equals("<Connect>"))
                    {
                        Console.WriteLine("Claim! {0}:{1} Want to connect. Print you answer (yes/no)",
                            remoteFullIp.Address.ToString(), remoteFullIp.Port);
                        var answer = "";
                        while (answer != "yes" && answer != "no")
                            answer = Console.ReadLine().ToLower();
                        if (answer == "yes")
                        {
                            remoteAddresses.Add(remoteFullIp.Port);
                        }
                        EndPoint remotePoint = new IPEndPoint(IPAddress.Parse("127.0.0.1"), remoteFullIp.Port);
                        listeningSocket.SendTo(Encoding.Unicode.GetBytes(answer), remotePoint);

                        Thread.Sleep(50);
                        foreach (var message in chatHistory)
                        {
                            listeningSocket.SendTo(Encoding.Unicode.GetBytes(message), remotePoint);
                            Thread.Sleep(10);
                        }
                    }
                    else
                    {
                        var message = $"{remoteFullIp.Address}:{remoteFullIp.Port} - {builder.ToString()}";
                        Console.WriteLine(message);
                        chatHistory.Add(message);

                        foreach (var remoteP in remoteAddresses)
                        {
                            if (remoteP == remoteFullIp.Port)
                            {
                                continue;
                            }
                            EndPoint remotePoint = new IPEndPoint(IPAddress.Parse("127.0.0.1"), remoteP);
                            listeningSocket.SendTo(Encoding.Unicode.GetBytes(message), remotePoint);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                Close();
            }
        }

        private static void ClientListen()
        {
            try
            {
                IPEndPoint localIP = new IPEndPoint(IPAddress.Parse("127.0.0.1"), localPort);
                listeningSocket.Bind(localIP);

                while (true)
                {
                    StringBuilder builder = new StringBuilder();
                    int bytes = 0;
                    byte[] data = new byte[256];

                    EndPoint remoteIp = new IPEndPoint(IPAddress.Any, 0);
                    do
                    {
                        bytes = listeningSocket.ReceiveFrom(data, ref remoteIp);
                        builder.Append(Encoding.Unicode.GetString(data, 0, bytes));
                    }
                    while (listeningSocket.Available > 0);
                    IPEndPoint remoteFullIp = remoteIp as IPEndPoint;

                    if (remoteFullIp.Port != remotePort)
                        continue;

                    if (connect == ConnectStatus.Loading)
                    {
                        if (builder.ToString() == "no")
                        {
                            connect = ConnectStatus.Disconnected;
                            Console.WriteLine("You are disconnected. Press enter to continue...");
                            break;
                        }
                        else if (builder.ToString() == "yes")
                        {
                            connect = ConnectStatus.Connected;
                            Console.WriteLine("You are connected. Write message and enter to send");
                            continue;
                        }
                    }


                    Console.WriteLine(builder.ToString());
                }
            }
            catch (SocketException ex)
            {
                connect = ConnectStatus.Disconnected;
                Console.WriteLine("You are disconnected. Press enter to continue...");
                Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Close();
            }
        }

        private static void Close()
        {
            if (listeningSocket != null)
            {
                listeningSocket.Shutdown(SocketShutdown.Both);
                listeningSocket.Close();
                listeningSocket = null;
            }
        }
    }
}