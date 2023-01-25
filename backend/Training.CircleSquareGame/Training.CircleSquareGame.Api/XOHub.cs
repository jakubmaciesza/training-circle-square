using Microsoft.AspNetCore.SignalR;

namespace Training.CircleSquareGame.Api;

public class XOHub : Hub
{
    public async Task GetField(string fieldId)
    {
        await Clients.All.SendAsync("CurrentFieldValue", fieldId, "");
    }
    
    public async Task SetField(string fieldId, string fieldValue)
    {
        await Clients.All.SendAsync("CurrentFieldValue", fieldId, fieldValue);
    }

    public async Task SetNextPlayer(string nextPlayer)
    {
        await Clients.All.SendAsync("NextPlayer", nextPlayer);
    }

    public async Task SetWinner(string winner)
    {
        await Clients.All.SendAsync("Winner", winner);
    }
}